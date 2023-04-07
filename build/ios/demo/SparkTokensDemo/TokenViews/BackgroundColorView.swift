//
//  BackgroundView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct BackgroundRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        HStack {
            ZStack {
                Rectangle()
                    .fill(color)
                    .frame(width: 50, height: 50)
            }.border(Color.brandPrimaryPrimary, width: Size.borderWidthSm)
            VStack(alignment: .leading) {
                Text(label)
            }
            .padding(.leading, Size.paddingMd)
            Spacer()
        }.padding(Size.paddingMd)
    }
}

struct BackgroundColorView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Group {
                        BackgroundRow(label:"Primary", color:Color.brandPrimaryPrimary)
                        BackgroundRow(label:"Secondary", color:Color.brandSecondarySecondary)
                    }
                    Group {
                        BackgroundRow(label:"Success", color:Color.brandFeedbackSuccess)
                        BackgroundRow(label:"Alert", color:Color.brandFeedbackAlert)
                        BackgroundRow(label:"Error", color:Color.brandFeedbackError)
                        BackgroundRow(label:"Info", color:Color.brandFeedbackInfo)
                        BackgroundRow(label:"Neutral", color:Color.brandFeedbackNeutral)
                    }
                }
            }
        }
        .navigationBarTitle("Background Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandPrimaryOnPrimary)
    }
}

struct BackgroundColorView_Previews: PreviewProvider {
    static var previews: some View {
        BackgroundColorView()
    }
}

